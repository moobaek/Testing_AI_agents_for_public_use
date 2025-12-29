"""
MCP Client Runner (Stateful + Mount Update)
===========================================
MCP 프로토콜 준수 및 최신 서버 코드 마운트
"""

import subprocess
import json
import os
import argparse
import sys
from typing import Dict, Any, Optional

DOCKER_IMAGE = "pm-parser-mcp"
HOST_DATA_PATH = r"c:\Users\k_dragon\Documents\github_moobeak\Testing_AI_agents_for_public_use\PM_agent\background"
CONTAINER_DATA_PATH = "/app/data"
SERVER_SCRIPT_PATH = r"c:\Users\k_dragon\Documents\github_moobeak\Testing_AI_agents_for_public_use\PM_agent\prompts\mcp\server.py"

class MCPClient:
    def __init__(self):
        self.process = None
        self.request_id = 0

    def start(self):
        docker_cmd = [
            "docker", "run", "-i", "--rm",
            "-v", f"{HOST_DATA_PATH}:{CONTAINER_DATA_PATH}:ro",
            "-v", f"{SERVER_SCRIPT_PATH}:/app/server.py:ro",
            DOCKER_IMAGE
        ]
        
        self.process = subprocess.Popen(
            docker_cmd,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=sys.stderr,
            text=True,
            encoding='utf-8',
            bufsize=1
        )

    def send_request(self, method: str, params: Optional[Dict] = None) -> Dict:
        self.request_id += 1
        req = {
            "jsonrpc": "2.0",
            "method": method,
            "id": self.request_id
        }
        if params is not None:
            req["params"] = params
            
        self._write(req)
        return self._read_response(self.request_id)

    def send_notification(self, method: str, params: Optional[Dict] = None):
        req = {
            "jsonrpc": "2.0",
            "method": method
        }
        if params:
            req["params"] = params
        self._write(req)

    def _write(self, data: Dict):
        json_str = json.dumps(data)
        self.process.stdin.write(json_str + "\n")
        self.process.stdin.flush()

    def _read_response(self, expect_id: int) -> Dict:
        while True:
            line = self.process.stdout.readline()
            if not line:
                raise Exception("Server closed connection")
            
            try:
                data = json.loads(line)
                if "id" in data and data["id"] == expect_id:
                    if "error" in data:
                        raise Exception(f"RPC Error: {data['error']}")
                    return data["result"]
            except json.JSONDecodeError:
                continue

    def close(self):
        if self.process:
            self.process.stdin.close()
            self.process.wait()

def path_to_container_path(host_path: str) -> str:
    abs_path = os.path.abspath(host_path)
    try:
        rel_path = os.path.relpath(abs_path, HOST_DATA_PATH)
    except:
        return host_path
    
    path = f"{CONTAINER_DATA_PATH}/{rel_path}".replace("\\", "/")
    if path.endswith("/"):
        path = path[:-1]
    return path

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--tool", help="도구 이름")
    parser.add_argument("--file", help="파일 또는 폴더 경로")
    parser.add_argument("--list", action="store_true", help="도구 목록 확인")
    parser.add_argument("--output", help="결과 저장 경로")
    parser.add_argument("--type", help="추가 인자 (doc_type)")
    parser.add_argument("--args", help="추가 인자 JSON 문자열")
    
    args = parser.parse_args()
    
    client = MCPClient()
    try:
        client.start()
        
        # 1. Initialize
        client.send_request("initialize", {
            "protocolVersion": "2024-11-05", 
            "capabilities": {},
            "clientInfo": {"name": "runner", "version": "1.0"}
        })
        
        # 2. Initialized
        client.send_notification("notifications/initialized")
        
        result = None
        
        if args.list:
            result = client.send_request("tools/list")
            print(json.dumps(result, ensure_ascii=False, indent=2))
            
        elif args.tool:
            arguments = {}
            if args.args:
                try:
                    arguments = json.loads(args.args)
                except json.JSONDecodeError:
                    print("❌ Error: --args must be valid JSON string")
                    return
            
            if args.file:
                mapped_path = path_to_container_path(args.file)
                if args.tool == "batch_parse_folder" or args.tool == "scan_folder_files":
                    arguments["folder_path"] = mapped_path
                else:
                    arguments["file_path"] = mapped_path
            
            if args.type:
                arguments["doc_type"] = args.type
                
            call_result = client.send_request("tools/call", {
                "name": args.tool,
                "arguments": arguments
            })
            
            if "content" in call_result:
                text = call_result["content"][0]["text"]
                try:
                    result = json.loads(text)
                except:
                    result = {"raw": text}
            else:
                result = call_result

            if args.output:
                with open(args.output, 'w', encoding='utf-8') as f:
                    json.dump(result, f, ensure_ascii=False, indent=2)
                print(f"✅ 저장: {args.output}")
            else:
                print(json.dumps(result, ensure_ascii=False, indent=2))
                
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    main()
