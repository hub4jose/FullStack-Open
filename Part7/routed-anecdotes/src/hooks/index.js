import { useState } from "react";

export const useField = (type) => {
  const [value, setValue]= useState('')

  const onChange = (e) =>{

      setValue(e.target.value)
  }

  const resetValue = (resValue) => setValue(resValue)

  return {
      type,
      value,
      onChange,
      resetValue
  }

}
