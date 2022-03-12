import {
  v4 as uuidv4
} from 'uuid';
export default function getUuid() {
  let result = localStorage.getItem("UUID_TOKEN")
  if (!result) {
    let uuid = uuidv4()
    localStorage.setItem("UUID_TOKEN", uuid)
  }
  return result
}