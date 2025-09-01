import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Move {
    captured?: string;
    color: 'w' | 'b';
    flags: string;
    from: string;
    piece: string;
    san: string;
    to: string;
}

interface GameState {
    fen: string;
    game_over: boolean;
    in_check: boolean;
    in_checkmate: boolean;
    in_draw: boolean;
    in_promotion: boolean;
    in_stalemate: boolean;
    in_threefold_repetition: boolean;
    insufficient_material: boolean;
}

interface MoveData {
    move: Move;
    state: GameState;
}

const pieceValues: Record<string, number> = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 0,
};

interface Box {
    highlighted: boolean;
    score?: number;
}

const ChessBoard = () => {
    const [whiteBoxes, setWhiteBoxes] = useState<Box[]>(Array(6).fill({ highlighted: false }));
    const [blackBoxes, setBlackBoxes] = useState<Box[]>(Array(6).fill({ highlighted: false }));

    const handleMove = (data: MoveData) => {

        const capturedScore = data.move.captured ? pieceValues[data.move.captured] : undefined;

        if (data.move.color === 'w') {
            const index = whiteBoxes.findIndex(b => !b.highlighted);
            if (index !== -1) {
                const newBoxes = [...whiteBoxes];
                newBoxes[index] = { highlighted: true, score: capturedScore };
                setWhiteBoxes(newBoxes);
            }
        } else {
            const index = blackBoxes.findIndex(b => !b.highlighted);
            if (index !== -1) {
                const newBoxes = [...blackBoxes];
                newBoxes[index] = { highlighted: true, score: capturedScore };
                setBlackBoxes(newBoxes);
            }
        }

        const whiteMovesDone = whiteBoxes.filter(b => b.highlighted).length + (data.move.color === 'w' ? 1 : 0);
        const blackMovesDone = blackBoxes.filter(b => b.highlighted).length + (data.move.color === 'b' ? 1 : 0);

        if ((whiteMovesDone >= 6 && blackMovesDone >= 6) || data.state.in_checkmate) {
            alert('Game Finished');
        }
    };

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="w-screen h-screen justify-center items-center bg-[#330457] p-10">
                <View className="w-screen h-screen justify-center items-center gap-14">

                    <View className="w-[95vw] h-28 border-[#9B7580] border-2 mt-10 justify-center gap-4">
                        <Text className='text-white text-xl ml-4'>Opponent&apos;s turn</Text>
                        <View className='flex-row justify-between items-center px-2'>
                            {blackBoxes.map((box, i) => (
                                <View
                                    key={i}
                                    className={`w-[14%] h-10 border border-gray-200 rounded-md justify-center items-center ${box.highlighted ? 'bg-[#AEA7D0]' : ''}`}
                                >
                                    {box.score && <Text className='text-black font-bold'>{box.score}</Text>}
                                </View>
                            ))}
                        </View>
                    </View>

                    <Chessboard onMove={(data) => { handleMove(data) }} />

                    <View className="w-[95vw] h-28 border-[#9B7580] border-2 mt-10 justify-center gap-4">
                        <Text className='text-white text-xl ml-4'>Your turn</Text>
                        <View className='flex-row justify-between items-center px-2'>
                            {whiteBoxes.map((box, i) => (
                                <View
                                    key={i}
                                    className={`w-[14%] h-10 border border-gray-200 rounded-md justify-center items-center ${box.highlighted ? 'bg-[#AEA7D0]' : ''}`}
                                >
                                    {box.score && <Text className='text-black font-bold'>{box.score}</Text>}
                                </View>
                            ))}
                        </View>
                    </View>

                </View>
            </View>
        </GestureHandlerRootView>
    );
};

export default ChessBoard;
