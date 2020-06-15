import { create } from '@dojo/framework/core/vdom';
import { createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import { RenderResult } from '@dojo/framework/core/interfaces';

const resourceMiddleware = createResourceMiddleware();

const factory = create({ resource: resourceMiddleware }).children<(resource: ReturnType<typeof resourceMiddleware>['api']) => RenderResult>();

export default factory(function ResourceWrapper({ middleware: { resource }, children }) {
    const [renderer] = children();
    return renderer(resource);
});

