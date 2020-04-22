const config = require('./config');
const Request = require('./request');


class Gitlab extends Request {

    constructor(gitlabHost, token) {
        super()
        this.gitlabHost = gitlabHost
        this.token = token
    }


    //TODO 这里写那几个接口的实现

    /**
     * 仅供参考
     * @param {*} sign 
     */
    async getProjects() {
        const url = this.gitlabHost + '/api/v4/projects?private_token=' + this.token;
        try {
            let res = await this._ajax({
                url: url
            });
            // console.log('==> getProjects', res.body);
            return JSON.parse(res.body);
        } catch (e) {
            console.log('==> get projects info data error', e)
            return null;
        }
    }

    async getBranches(id, token) {
        const url = this.gitlabHost + '/api/v4/projects/' + id + '/repository/branches?private_token=' + this.token;
        try {
            let res = await this._ajax({
                url: url
            });
            // console.log('==> getBranches', res.body);
            return JSON.parse(res.body);
        } catch (e) {
            console.log('==> get branches info data error', e)
            return null;
        }
    }

    async getCommits(id, ref_name, token) {
        const url = this.gitlabHost + '/api/v4/projects/' + id + '/repository/commits?ref_name=' + ref_name + '&private_token=' + this.token;
        try {
            let res = await this._ajax({
                url: url
            });
            // console.log('==> getCommits', res.body);
            return JSON.parse(res.body);
        } catch (e) {
            console.log('==> get commits info data error', e)
            return null;
        }
    }

    async getStats(id, commit_id, token) {
        const url = this.gitlabHost + '/api/v4/projects/' + id + '/repository/commits/' + commit_id + '?private_token=' + this.token;
        try {
            let res = await this._ajax({
                url: url
            });
            // console.log('==> getStats', res.body);
            return JSON.parse(res.body);
        } catch (e) {
            console.log('==> get stats info data error', e)
            return null;
        }
    }
}
module.exports = Gitlab;