import { isEmpty, isUrl } from '../../fn'
import BaseModel from './Base'
import type { IFormUrlModel } from '../types'
import type { Object } from '../../types'

 /**
  * Model to represent an url input
  */
export default class UrlModel extends BaseModel implements IFormUrlModel {

  /**
   * Type
   */
  type: 'url' = 'url'

  /** */
  constructor(def: Object) {
    super(def)
  }

  /**
   * Type- and required-validation
   */
  validate() {
    if (isEmpty(this.value)) {
      if (this.required) {
        return this.setValid('required')
      }
    } else if(!isUrl(this.value)) {
      return this.setValid('type')
    }
    return this.setValid()
  }
}