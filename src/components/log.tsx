import { LogLine } from './logLine'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

export default function Log({ file }: { file: any }) {
    return (
        <AutoSizer>
            {({ height, width }) => (
                <List height={height} itemCount={file.lines.length} itemSize={20} width={width} style={{ overflowX: 'scroll' }}>
                    {({ index, style }) => <LogLine style={style} line={file.lines[index]} />}
                </List>
            )}
        </AutoSizer>
    )
}
