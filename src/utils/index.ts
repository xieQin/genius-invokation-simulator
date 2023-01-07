export function getRandom<T>(num: number, data: T[]): T[] {
  const res = [];
  let count = num;
  const temp = Object.assign([], data);
  while (count > 0) {
    const _r = Math.floor(Math.random() * temp.length);
    res.push(data[_r]);
    temp.splice(_r, 1);
    count -= 1;
  }
  return res;
}
