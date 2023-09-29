import Symptom from './Symptom';
import React, { useState, useEffect } from 'react'

interface SymptomData {
    id: number;
    symptom: string;
}

interface Props {
    searchKey: string;
    onSelectItem: (id: number, name: string) => void;
}

const SymptomGroup = ({ searchKey, onSelectItem }: Props) => {
    const [data, setData] = useState<SymptomData[]>([]);
    
    useEffect(() => {
        if (searchKey.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"search_key": searchKey})
            };

            fetch('https://disease-predictor.azurewebsites.net/symptomsearch', requestOptions)
                .then(res => res.json())
                .then((data: SymptomData[]) => {
                    setData(data);
                })
                .catch(error => console.error('Error:', error));
        } else {
            fetch("https://disease-predictor.azurewebsites.net//symptoms")
                .then(res => res.json())
                .then((data: SymptomData[]) => {
                    setData(data);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [searchKey]);

    const handleSelectedItem = (id: number, name: string) => {
        onSelectItem(id, name);
    };

    return (
        <>
            {searchKey.length == 0 && data.length == 0 && <div className="loading">Loading&#8230;</div>}
            <div className="symptom-group">
                {data.map(s => (
                    <Symptom key={s.id} onSelectItem={handleSelectedItem} id={s.id} name={s.symptom} />
                ))}
            </div>
        </>
    );
};

export default SymptomGroup;



