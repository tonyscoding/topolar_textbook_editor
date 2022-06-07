import React, { createContext, useMemo, useState } from 'react';

export const TextbookContext = createContext({
  stepIndex: 0,
  itemIndex: 0,
  setIndex: () => {},
  addStep: () => {},
  setStep: () => {},
  deleteStep: () => {},
  addItem: () => {},
  setItem: () => {},
  addDescription: () => {},
  addImage: () => {},
  addCode: () => {},
  addLink: () => {},
  addTable: () => {},
  deleteDescription: () => {},
  setDescription: () => {}
});