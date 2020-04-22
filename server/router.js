const Router = require('@koa/router');
const router = new Router();
const Gitlab = require('./lib/gitlab');
// 引入环境变量
const CONFIG = require('./lib/config.js');




// 获取jssdk
router.post('/api/get_gitlab_codeline', async (ctx, next) => {

    let {
        gitlabHost,
        query_branch,
        author,
        start,
        end
    } = ctx.request.body
    let token = ctx.get('private_token')
    if (!gitlabHost || !token) {
        return ctx.body({
            errcode: -1,
            errmsg: '缺少gitlabHost或者token'
        })
    }
    console.log('params==>', token, gitlabHost, author, start, end)

    let startDate = new Date(start)
    let endDate = new Date(end)

    let gitlab = new Gitlab(gitlabHost, token)

    let projects = await gitlab.getProjects()

    let sum = 0
    let allCommits = []

    for (let project of projects) {
        console.log('project_id--------------------------------------->', project.id)
        let branches = await gitlab.getBranches(project.id);
        for (let branch of branches) {
            if (query_branch && branch.name != query_branch) {
                continue
            }
            console.log('branch_name---------------->', branch.name)
            let commits = await gitlab.getCommits(project.id, branch.name);
            for (let commit of commits) {
                let date = new Date(commit.created_at)
                if (date.getTime() < startDate.getTime() && date.getTime() > endDate.getTime()) {
                    continue
                }
                if (author && commit.author_name != author) {
                    continue
                }
                // if (commit.author_name != 'lalala' && commit.author_name != 'zhouxuhuang' && commit.author_name != 'zhou' && commit.author_name != 'root') {
                //     continue
                // }
                // if (commit.title.indexOf('Merge') > -1 || commit.message.indexOf('Merge') > -1) {
                //     continue
                // }
                console.log('commit_id----->', commit.id)

                let stats = await gitlab.getStats(project.id, commit.id, token)
                console.log('add del total', stats.stats.additions, stats.stats.deletions, stats.stats.total)
                sum += stats.stats.total
                allCommits.push(stats)
            }
        }
    }
    console.log('sum codeline', sum)
    ctx.body = ({
        errcode: 0,
        errmsg: 'ok',
        data: {
            total_codeline: sum,
            allCommits: allCommits
        }
    })

});


module.exports = router.routes();