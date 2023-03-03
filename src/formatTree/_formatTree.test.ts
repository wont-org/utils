import { formatTree } from './formatTree'

describe('formatTree 方法测试', () => {
    test('execute', () => {
        const beforeTree = {
            id: 0,
            children: [
                {
                    id: 1,
                    label: '1-1',
                    children: [
                        {
                            id: 11,
                            label: '1-1-1',
                            children: [
                                {

                                    id: 111,
                                    label: '1-1-1-1',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    label: '2-1',
                },
            ],
        }
        const afterTree = {
            id: 0,
            value: 0,
            selectable: false,
            children: [
                {
                    id: 1,
                    value: 1,
                    label: '1-1',
                    selectable: false,
                    children: [
                        {
                            id: 11,
                            value: 11,
                            label: '1-1-1',
                            selectable: false,
                            children: [
                                {

                                    id: 111,
                                    value: 111,
                                    label: '1-1-1-1',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    value: 2,
                    label: '2-1',
                },
            ],
        }
        formatTree({
            obj: beforeTree,
            key: 'children',
            cb: (obj) => {
                const result = obj
                result.value = obj.id
                if (result.children?.length > 0) {
                    result.selectable = false
                }
            },
        })
        expect(beforeTree).toStrictEqual(afterTree)
    })
})
