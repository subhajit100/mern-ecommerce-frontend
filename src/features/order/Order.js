import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createOrderAsync,
} from './counterSlice';

export default function Order() {
  const dispatch = useDispatch();

  return (
    <div>
      Hello
    </div>
  );
}
