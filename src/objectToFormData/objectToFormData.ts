/**
 * @description 对象递归转`FormData`，支持递归转换
 * @function objectToFormData
 * @param {Object} obj - 数据源对象
 * @returns {FormData} 转换后的数据，格式为FormData
 * @author liukun <919590347@qq.com>
 * @example
 * import { objectToFormData } from '@wont/utils'
 * objectToFormData({a:1})  // returns 1
 */
import { isNaN } from 'lodash-es';

interface NestedObj {
  [key: string]: NestedObj | string | number | File | File[] | any
}
export const objectToFormData = (
  obj: NestedObj,
  rawParentKey = '',
): FormData => {
  // console.log('obj :>> ', obj);
  const parentKey = rawParentKey;
  const formData = new FormData();
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if ([undefined, null].includes(value) || isNaN(value)) {
        continue;
      }
      // console.log('key,value :>> ', key, value);
      const propName = parentKey ? `${parentKey}[${key}]` : key;
      if (value instanceof File) {
        formData.append(propName, value);
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        objectToFormData(value, propName);
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          const arrayPropName = `${propName}`;
          if (item instanceof File) {
            formData.append(arrayPropName, item);
          } else if (typeof item === 'object' && !Array.isArray(value)) {
            objectToFormData(item, arrayPropName);
          } else {
            formData.append(arrayPropName, item);
          }
        });
      } else {
        formData.append(propName, value.toString());
      }
    }
  }
  // console.log('formData :>> ', formData);
  return formData;
};
