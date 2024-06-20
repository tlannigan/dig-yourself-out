import { LogLine } from './logLine'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

export default function Log({ file, listRef }: { file: any, listRef: any }) {
    return (
        <AutoSizer>
            {({ height, width }) => (
                <List ref={listRef} height={height} itemCount={file.lines.length} itemSize={20} width={width} style={{ overflowX: 'scroll' }}>
                    {({ index, style }) => <LogLine index={index} style={style} line={file.lines[index]} />}
                </List>
            )}
        </AutoSizer>
    )
}
