import React, {useState, useRef} from "react";
import ListItem from "./ListItem";
import { nanoid } from 'nanoid';
import isValidDate from "./DateValidator";
import compareDates from "./DateComparator";


export default function ActivityMemory() {
    const [walkHistory, setWalkHistory] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const dateField = useRef();
    const distField = useRef();
    const editDateField = useRef();
    const editDistField = useRef();


    const addHistoryPoint = (evt) => {
        evt.preventDefault();

        if(!isValidDate(dateField.current.value)) {
            // проверяем форматное ли время - если нет - пишем в консоль. 
            // заморачиваться с красивым уведомлением не стоит задачи и нет времени.
            console.log("Check the date you trying to enter... please?!");
            return
        }

        // Оба вариант довольно императивные, не хватает декларативности. Но идей других нет.

        // Вариант без флага
        
        let oldDistance = walkHistory.filter(element => element.date === dateField.current.value).length ?
             +(walkHistory.filter(element => element.date === dateField.current.value)[0].distance) 
             : null;
    
        let protoHistory = walkHistory.filter(element => element.date !== dateField.current.value);


        setWalkHistory(
            [
                ...protoHistory,  {
                date: dateField.current.value,
                distance: oldDistance ? oldDistance + +distField.current.value : +distField.current.value,
                id: nanoid()
                }
            ].sort(compareDates)
        )


        // Вариант с флагом

        // // делаю копию массива, так чтобы Реакт думал - что это две разные штуки.
        // let protoHistory = walkHistory.slice(); 
        // // использую флаг, чтобы различать - когда данные добавляются, а когда меняются.
        // let isChanged = 0;

        // // меняю флаг и копию когда, даты совпадают.
        // protoHistory.forEach(item => {
        //     if(item.date === dateField.current.value) {
        //         item.distance = item.distance + +distField.current.value;
        //         isChanged += 1;
        //     }
        // } )

        // //вношу изменения согласно флагу.
        // if (!isChanged) {
        //     setWalkHistory(
        //         [
        //             ...walkHistory,  {
        //             date: dateField.current.value,
        //             distance: +distField.current.value,
        //             id: nanoid()
        //             }
        //         ].sort(compareDates)
        //     ) 
        // } else {
        //     setWalkHistory(protoHistory)
        // }
        


        dateField.current.value = '';
        distField.current.value = '';
    }

    const editHistoryPoint = (evt) => {
        evt.preventDefault();

        let protoHistory = walkHistory.filter(element => element.id !== isEditing.id);
        setWalkHistory(
            [
                ...protoHistory,  {
                date: editDateField.current.value,
                distance: editDistField.current.value,
                id: nanoid()
                }
            ].sort(compareDates)
        )
        
        editDateField.current.value = '';
        editDistField.current.value = '';
        setEditing(false);
    }
    

    const mainLayout = <div className="activity container">
                            <form className="activity-form">
                                <div>
                                    <label htmlFor="date">Date(DD.MM.YY)</label>
                                    <input name="date" ref={dateField} required />
                                </div>
                                <div>
                                    <label htmlFor="distance" value={"Пройдено км"}>Distance km</label>
                                    <input name="distance" ref={distField}  required />
                                </div>
                                <button onClick={addHistoryPoint}>OK</button>
                            </form>
                            <div className="activity-laidout">
                                <div className="titles">
                                    <span>Date(DD.MM.YY)</span>
                                    <span>distance km</span>
                                    <span>actions</span>
                                </div>
                                <ul className="activity-list">
                                {
                                    walkHistory.map((log) => <ListItem key={log.id} logItem={log} setEditing={setEditing} walkHistory={walkHistory} setWalkHistory={setWalkHistory} />)
                                } 
                                </ul>
                            </div>
                        </div>

    const editLayout = <div className="activity container">
                            <form className="activity-form">
                                <div>
                                    <label htmlFor="date">Edit Date {isEditing.date} </label>
                                    <input name="date" ref={editDateField} required />
                                </div>
                                <div>
                                    <label htmlFor="distance" value={"Пройдено км"}> Edit Distance {isEditing.distance}</label>
                                    <input name="distance" ref={editDistField} required />
                                </div>
                                <button onClick={editHistoryPoint}>Edit!</button>
                            </form>
                        </div>

    return isEditing ? editLayout : mainLayout
    
}