import React from 'react';
import Slot from './Slot';
import type { SlotPropTypes } from './Slot';

type SlotContainerPropTypes = {} & SlotPropTypes;

export default function SlotContainer({
  index,
  data,
  type,
  id,
  image
}: SlotContainerPropTypes) {
  return (
    <Slot
      index={index}
      data={data}
      type={type}
      id={id}
      image={image}
    />
  );
}
