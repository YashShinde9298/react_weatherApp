function InfoCard({ title, value, text }) {
    return (<>
        <div className="w-[200px] h-[100px] bg-gray-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg p-4">
            <h3 className="text-slate-400 text-[15px]">{title}</h3>
            <h4 className="text-white text-[25px] flex justify-center">{value} {text}</h4>
        </div>
    </>);
}

export default InfoCard;