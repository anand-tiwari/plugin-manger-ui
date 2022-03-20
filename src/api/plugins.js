import axios from 'axios'
import config from '@/config'

export default {
    getPlugins: async() => {
        try {
            return await axios.get(`${config.api.plugins}`);
        } catch (err) {
            console.log(err)
            return {}
        }
    },
    postPlugins: async(postdata) => {
        try {
            await axios.patch(`${config.api.plugins}`, { data: postdata });
        } catch (err) {
            console.log(err)
            return {}
        }
    }

}