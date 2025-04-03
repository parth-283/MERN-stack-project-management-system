import React from 'react'
import TaskCard from '../Components/Cards/TaskCard'

const Board = () => {
    const length = [1, 2, 3, 5, 4, 6, 10, 8, 9, 7]
    return (
        <div>
            {length.map((_) => {
                return (<>
                    <TaskCard />
                </>)
            })}
        </div>
    )
}

export default Board