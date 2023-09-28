import Symptom from './Symptom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

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

            fetch('http://127.0.0.1:5000/symptomsearch', requestOptions)
                .then(res => res.json())
                .then((data: SymptomData[]) => {
                    setData(data);
                })
                .catch(error => console.error('Error:', error));
        } else {
            fetch("http://127.0.0.1:5000//symptoms")
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
        <div className="symptom-group">
            {data.map(s => (
                <Symptom key={s.id} onSelectItem={handleSelectedItem} id={s.id} name={s.symptom} />
            ))}
        </div>
    );
};

export default SymptomGroup;



