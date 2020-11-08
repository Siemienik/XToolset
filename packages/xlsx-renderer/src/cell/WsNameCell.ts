import { BaseCell } from './BaseCell';
import { Cell, ValueType } from 'exceljs';
import { Scope } from '../Scope';
import { ViewModel } from '../ViewModel';

export class WsNameCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 10) === '#! WS_NAME'
        );
    }

    protected static _getName(scope: Scope): string {
        let name = WsNameCell._getTargetValue(scope) || WsNameCell._getTarget(scope);
        name = name.replace(/[\\\/*\[\]?]/g, '.');

        if (scope.output.worksheets.find(x => x.name === name)) {
            name += ` ${scope.outputCell.ws}`;
        }

        name = name.length > 31 ? name.substr(name.length - 31) : name;

        return name;
    }

    protected static _getTargetValue(scope: Scope) {
        return WsNameCell._getTarget(scope)
            .split('.')
            .reduce((p: ViewModel, c: string) => p[c] || '', scope.vm);
    }

    protected static _getTarget(scope: Scope): string {
        return scope.getCurrentTemplateString().split(' ')[2];
    }

    public apply(scope: Scope): WsNameCell {
        super.apply(scope);

        scope.setCurrentOutputValue(null);

        scope.output.worksheets[scope.outputCell.ws].name = WsNameCell._getName(scope);
        scope.incrementCol();

        return this;
    }
}
