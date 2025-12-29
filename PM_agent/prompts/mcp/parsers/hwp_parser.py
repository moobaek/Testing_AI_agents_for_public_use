"""
HWP 파서 (한글 문서)
"""

import os
import struct
import zlib
from datetime import datetime
from typing import Dict, List, Any


def parse_hwp(file_path: str) -> Dict[str, Any]:
    """HWP 파일 파싱"""
    try:
        import olefile
    except ImportError:
        return {"error": "olefile 설치 필요: pip install olefile"}
    
    filename = os.path.basename(file_path)
    
    try:
        ole = olefile.OleFileIO(file_path)
    except Exception as e:
        return {"error": f"HWP 파일 열기 실패: {str(e)}"}
    
    paragraphs = []
    
    for i in range(256):
        section_name = f"BodyText/Section{i}"
        if not ole.exists(section_name):
            break
        
        try:
            section_data = ole.openstream(section_name).read()
            
            if ole.exists("FileHeader"):
                header = ole.openstream("FileHeader").read()
                if len(header) >= 36:
                    flags = struct.unpack("<I", header[32:36])[0]
                    if flags & 1:
                        try:
                            section_data = zlib.decompress(section_data, -15)
                        except:
                            pass
            
            text = _extract_text(section_data)
            paragraphs.extend(text)
        except:
            continue
    
    ole.close()
    
    return {
        "filename": filename,
        "type": "hwp",
        "parsed_at": datetime.now().isoformat(),
        "content": {
            "paragraphs": paragraphs,
            "paragraph_count": len(paragraphs)
        }
    }


def _extract_text(data: bytes) -> List[str]:
    """섹션에서 텍스트 추출"""
    paragraphs = []
    i = 0
    
    while i < len(data):
        try:
            if i + 4 > len(data):
                break
            
            header = struct.unpack("<I", data[i:i+4])[0]
            tag_id = header & 0x3FF
            size = (header >> 20) & 0xFFF
            
            if size == 0xFFF:
                if i + 8 > len(data):
                    break
                size = struct.unpack("<I", data[i+4:i+8])[0]
                i += 8
            else:
                i += 4
            
            if i + size > len(data):
                break
            
            record_data = data[i:i+size]
            i += size
            
            if tag_id == 67:  # HWPTAG_PARA_TEXT
                try:
                    text = record_data.decode('utf-16-le', errors='ignore')
                    text = ''.join(c for c in text if c.isprintable() or c in '\n\t ')
                    text = text.strip()
                    if text and len(text) > 1:
                        paragraphs.append(text)
                except:
                    pass
        except:
            break
    
    return paragraphs
