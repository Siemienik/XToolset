import { BaseCell } from './BaseCell';
import { Scope } from '../Scope';
import { Cell, ValueType } from 'exceljs';

export class HyperlinkCell extends BaseCell {
    public static match(cell: Cell): boolean {
        return (
            cell &&
            cell.type === ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 12) === '#! HYPERLINK'
        );
    }

    protected static getLabelParam(scope: Scope): string {
        return scope.getCurrentTemplateString().split(' ')[2];
    }

    protected static getUrlParam(scope: Scope): string {
        return scope.getCurrentTemplateString().split(' ')[3];
    }

    public apply(scope: Scope): HyperlinkCell {
        super.apply(scope);

        scope.setCurrentOutputValue(null);

        const url = HyperlinkCell.getUrlParam(scope)
            .split('.')
            .reduce((p, c) => p[c] || {}, scope.vm);
        if (typeof url === 'string') {
            const label =
                HyperlinkCell.getLabelParam(scope)
                    .split('.')
                    .reduce((p, c) => p[c] || {}, scope.vm) || url;
            scope.setCurrentOutputValue({ text: label, hyperlink: url });
        }

        scope.incrementCol();

        return this;
    }
}
