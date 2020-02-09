import {request} from "./request";
import axios from "../../../../coderwhy-商城项目/src/network/axios";

export function getCategoryData(){
  return request({
    url: '/category',
  })
}
export function getSubcategory(maitKey) {
  return axios({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
export function getCategoryDetail(miniWallkey, type) {
  return axios({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
