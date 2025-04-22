
export const ItemTitle = ({number,title}:{number:number,title:string}) => {
    return (
        <div className="w-full h-12 bg-gray-700 flex items-center gap-5 text-lg">
            <div className="w-10 border-r border-gray-500">
                <p className="text-center">{number}</p>
            </div>
            <h3>{title}</h3>
        </div>
    )
}