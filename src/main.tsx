import renderer, { w, v } from '@dojo/framework/core/vdom';
import { uuid } from '@dojo/framework/core/util';
import WidgetBase from '@dojo/framework/core/WidgetBase';
import watch from '@dojo/framework/core/decorators/watch';
import Select from '@dojo/widgets/select';
import theme from '@dojo/widgets/theme/dojo';
import Registry from '@dojo/framework/core/Registry'
import { registerThemeInjector } from '@dojo/framework/core/mixins/Themed';
import { createMemoryResourceTemplate } from '@dojo/framework/core/middleware/resources';
import ResourceWrapper from './ResourceWrapper';

interface Animals {
    value: string;
}

const template = createMemoryResourceTemplate<Animals>()

class App extends WidgetBase {
    @watch()
    private _selectedValue = '';

    private _id = uuid();

    private _onValue = (value: string) => {
        this._selectedValue = value;
    }

    render() {
        return (
            v('div', [
                w(ResourceWrapper, {}, [(resource) => {
                    return w(Select, {
                        resource: resource({ template,  initOptions: { id: this._id, data: [{ value: 'panda'} ] }}),
                        onValue: this._onValue
                    })
                }]),
                v('div', [this._selectedValue])
            ])
        );
    }
}

const registry = new Registry();
registerThemeInjector(theme, registry)

const r = renderer(() => w(App, {}));
r.mount({ registry });
