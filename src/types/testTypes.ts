import pkg from '@prisma/client'

export type Test = pkg.Test;

export type NewTestData = {
  name: string;
  pdfUrl: string;
  category: string;
  teacher: string;
  discipline: string;
};

export type ParsedNewTestData = Omit<Test, 'id'>;