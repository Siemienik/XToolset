export default function splitMapper(v: string, separator: string = ',') {
  return v.length > 0 ? v.split(separator) : [];
}
