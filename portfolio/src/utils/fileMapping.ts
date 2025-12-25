// ID: util.mapping.file_mapping
// 참조: architecture/Blue_Print.md#utility-functions
// 참조: architecture/Project_Structure_Design.md#utils-폴더
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  originalName?: string;
}

// 실제 업로드된 파일들을 기반으로 한 파일 트리 구조
export const createFileTreeFromUploads = (): FileNode[] => {
  return [
    {
      name: 'README',
      path: '/README',
      type: 'file',
      originalName: 'README.md'
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
      type: 'folder',
      children: [
        {
          name: 'Portfolio Index',
          path: '/portfolio/index',
          type: 'file',
          originalName: '00_Portfolio_Index.md'
        },
        {
          name: 'Relationship Map',
          path: '/portfolio/relationship-map',
          type: 'file',
          originalName: '00_Relationship_Map.md'
        },
        {
          name: 'Overview For Non Technical',
          path: '/portfolio/overview-non-technical',
          type: 'file',
          originalName: '00_Overview_For_Non_Technical.md'
        },
        {
          name: 'Key Achievements',
          path: '/portfolio/key-achievements',
          type: 'file',
          originalName: '01_Key_Achievements.md'
        },
        {
          name: 'Business Value',
          path: '/portfolio/business-value',
          type: 'file',
          originalName: '02_Business_Value.md'
        },
        {
          name: 'Projects Overview',
          path: '/portfolio/projects-overview',
          type: 'file',
          originalName: '02_Projects_Overview.md'
        },
        {
          name: 'Technology Simplified',
          path: '/portfolio/technology-simplified',
          type: 'file',
          originalName: '03_Technology_Simplified.md'
        },
        {
          name: 'Visual Portfolio',
          path: '/portfolio/visual-portfolio',
          type: 'file',
          originalName: '04_Visual_Portfolio.md'
        },
        {
          name: 'Academic Publications',
          path: '/portfolio/academic-publications',
          type: 'file',
          originalName: '04_Academic_Publications.md'
        }
      ]
    },
    {
      name: 'Execution Guide',
      path: '/execution-guide',
      type: 'folder',
      children: [
        {
          name: 'Step 01: Repetitive Work',
          path: '/execution-guide/step-01-repetitive-work',
          type: 'file',
          originalName: 'Step_01_Repetitive_Work.md'
        },
        {
          name: 'Step 02: Expertise Targeting',
          path: '/execution-guide/step-02-expertise-targeting',
          type: 'file',
          originalName: 'Step_02_Expertise_Targeting.md'
        },
        {
          name: 'Step 03: Micro Starts',
          path: '/execution-guide/step-03-micro-starts',
          type: 'file',
          originalName: 'Step_03_Micro_Starts.md'
        },
        {
          name: 'Step 04: Modularization',
          path: '/execution-guide/step-04-modularization',
          type: 'file',
          originalName: 'Step_04_Modularization.md'
        },
        {
          name: 'Step 05: IO Optimization',
          path: '/execution-guide/step-05-io-optimization',
          type: 'file',
          originalName: 'Step_05_IO_Optimization.md'
        },
        {
          name: 'Step 06: Daily Log',
          path: '/execution-guide/step-06-daily-log',
          type: 'file',
          originalName: 'Step_06_Daily_Log.md'
        },
        {
          name: 'Step 07: Visuals',
          path: '/execution-guide/step-07-visuals',
          type: 'file',
          originalName: 'Step_07_Visuals.md'
        },
        {
          name: 'Step 08: Feedback Loop',
          path: '/execution-guide/step-08-feedback-loop',
          type: 'file',
          originalName: 'Step_08_Feedback_Loop.md'
        },
        {
          name: 'Step 09: Continuous Update',
          path: '/execution-guide/step-09-continuous-update',
          type: 'file',
          originalName: 'Step_09_Continuous_Update.md'
        }
      ]
    },
    {
      name: 'Architecture',
      path: '/architecture',
      type: 'folder',
      children: [
        {
          name: 'Architecture Overview',
          path: '/architecture/overview',
          type: 'file',
          originalName: 'Architecture_Overview.md'
        }
      ]
    },
    {
      name: 'Testing',
      path: '/testing',
      type: 'folder',
      children: [
        {
          name: 'Testing Context',
          path: '/testing/context',
          type: 'file',
          originalName: 'Testing_Context.md'
        }
      ]
    },
    {
      name: 'Requirements',
      path: '/requirements',
      type: 'folder',
      children: [
        {
          name: '요구조건기술내용',
          path: '/requirements/technical-requirements',
          type: 'file',
          originalName: '요구조건기술내용.md'
        }
      ]
    }
  ];
};

// 파일 경로와 원본 파일명을 매핑하는 함수
export const getOriginalFileName = (path: string): string | null => {
  const pathToFileMap: Record<string, string> = {
    '/README': 'README.md',
    '/portfolio/index': '00_Portfolio_Index.md',
    '/portfolio/relationship-map': '00_Relationship_Map.md',
    '/portfolio/overview-non-technical': '00_Overview_For_Non_Technical.md',
    '/portfolio/key-achievements': '01_Key_Achievements.md',
    '/portfolio/business-value': '02_Business_Value.md',
    '/portfolio/projects-overview': '02_Projects_Overview.md',
    '/portfolio/technology-simplified': '03_Technology_Simplified.md',
    '/portfolio/visual-portfolio': '04_Visual_Portfolio.md',
    '/portfolio/academic-publications': '04_Academic_Publications.md',
    '/execution-guide/step-01-repetitive-work': 'Step_01_Repetitive_Work.md',
    '/execution-guide/step-02-expertise-targeting': 'Step_02_Expertise_Targeting.md',
    '/execution-guide/step-03-micro-starts': 'Step_03_Micro_Starts.md',
    '/execution-guide/step-04-modularization': 'Step_04_Modularization.md',
    '/execution-guide/step-05-io-optimization': 'Step_05_IO_Optimization.md',
    '/execution-guide/step-06-daily-log': 'Step_06_Daily_Log.md',
    '/execution-guide/step-07-visuals': 'Step_07_Visuals.md',
    '/execution-guide/step-08-feedback-loop': 'Step_08_Feedback_Loop.md',
    '/execution-guide/step-09-continuous-update': 'Step_09_Continuous_Update.md',
    '/architecture/overview': 'Architecture_Overview.md',
    '/testing/context': 'Testing_Context.md',
    '/requirements/technical-requirements': '요구조건기술내용.md'
  };
  
  return pathToFileMap[path] || null;
};