const splitDP = [
  { inValue: '', expectedResult: [] },
  { inValue: 'asd', expectedResult: ['asd'] },
  { inValue: 'asd,', expectedResult: ['asd', ''] },
  { inValue: 'asd,asd2', expectedResult: ['asd', 'asd2'] },
  { inValue: 'true,1', expectedResult: ['true', '1'] },
];

export { splitDP }
