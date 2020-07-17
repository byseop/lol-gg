import React from 'react';
import Slot from './Slot';
import type { SlotPropTypes } from './Slot';

type SlotContainerPropTypes = {} & SlotPropTypes;

export default function SlotContainer({
  index,
  gameVersion,
  data,
  type,
  id
}: SlotContainerPropTypes) {
  return (
    <Slot
      index={index}
      gameVersion={gameVersion}
      data={data}
      type={type}
      id={id}
    />
  );
}
