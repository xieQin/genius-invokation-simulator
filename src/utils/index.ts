export function getRandom<T>(num: number, data: T[], repeat = true): T[] {
  const res: T[] = [];
  const temp = Object.assign([], data);
  for (let i = 0; i < num; i++) {
    const _r = Math.floor(Math.random() * temp.length);
    res.push(temp[_r]);
    if (!repeat) temp.splice(_r, 1);
  }
  return res;
}
