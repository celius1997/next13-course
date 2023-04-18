export default function Header({name}: {name: string}) {

    const renderTitle = () => {
        //Seprao por guiones
        const nameArray = name.split('-');
        // La última palabra la pongo entre paréntesis porque es la ciudad
        nameArray[nameArray.length - 1]= `(${nameArray[nameArray.length - 1]})`;
        // Lo vuelvo a agrupar todo
        return nameArray.join(' ');

    }
    return(
        <div className='h-96 overflow-hidden'>
            <div className='bg-center bg-gradient-to-r from-[#CFCFCF] to-[#3E3E3E] h-full flex justify-center items-center'>
                <h1 className='text-7xl text-white capitalize text-shadow text-center'>
                    {renderTitle()}
                </h1>
            </div>
        </div>
    )
}