import { LogLine } from './logLine'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

export default function Log({ file, listRef, targetLine }: { file: any, listRef: any, targetLine: number }) {
    return (
        <AutoSizer>
            {({ height, width }) => (
                <List ref={listRef} height={height} itemCount={file.lines.length} itemSize={19} width={width} style={{ overflowX: 'scroll' }}>
                    {({ index, style }) => {
                        return (
                            <LogLine index={index} style={style} line={file.lines[index]} isTarget={targetLine === index + 1} />
                        )
                    }}
                </List>
            )}
        </AutoSizer>
    )
}
