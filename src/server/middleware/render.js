import Inferno from 'inferno'
import InfernoServer from 'inferno-server'
import fetchData from '../../shared/fetchData';
import router from '../../shared/router';
import Html from '../../client/components/App/Html'
import Context from '../../client/components/App/Context'
import routes from '../../client/routes'

/**
 * Server-side render
 * @param req
 * @param res
 */
export default function serverSideRender(req, res) {

    // Create routing
    const matchRoutes = {
        routes: routes(req.context),
        location: req.originalUrl
    }

    function sendResponse(statusCode, content) {
        res.status(statusCode).send('<!DOCTYPE html>\n' + content)
    }

    function renderComponent(component) {
        return (
            <Context context={req.context}>
                <Html>{component}</Html>
            </Context>
        )
    }

    router(matchRoutes, req.context).then(component => {
        sendResponse(200, InfernoServer.renderToString(renderComponent(component)))
    }).catch(error => {
        sendResponse(404, error.stack.replace(/\n/g, '<br>'))
    })
}