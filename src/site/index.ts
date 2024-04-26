import { ref } from 'vue'
import { isObj } from '../fn'
import { getPage } from '../api'
import { publish, subscribe, inject } from '../api/plugins'
import type { ApiPlugin, JSONObject } from '../types'

/**
 * original response data, parsed or not
 */
const data = ref<JSONObject>({})

/**
 * Init = request site.
 */
async function requestSite(): Promise<void> {
  const json = await getPage('/', { fields: true, raw: true })
  if (isObj(json) && json.ok) {
    data.value = parseResponse(json)
    publish('on-changed-site', json.body)
  }
}

/**
 * Get site's data.
 * 
 * @returns {object}
 */
export function getSite(): JSONObject {
  return data
}

/**
 * Parse response, if parser plugin is installed.
 */
function parseResponse(json: JSONObject): JSONObject {
  const fn = inject('parser', 'parseResponse', (json: JSONObject): JSONObject => json)
  return fn(json)
}

/**
 * Plugin
 */
export function createSite(): ApiPlugin {
  return {
    id: 'tric-vue-site-plugin',
    name: 'site',
    init: async (): Promise<void> => {
      await requestSite()
      subscribe('on-changed-langcode', requestSite)
    },
    export: {
      getSite,
    }
  }
}