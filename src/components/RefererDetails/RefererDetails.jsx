import React,{useState,useEffect} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";

const RefererDetails = ({onNext,getReferData,referData}) => {debugger;
    const [referDetails, setReferDetails] = useState(referData)

    const handleNext = () => {
        getReferData(referDetails);
        onNext();
    }

    const onChangeTextHandle = (title, value) => {
        const existingDetail = referDetails.find(detail => detail.title === title);

        if (existingDetail) {
            setReferDetails(prevDetails =>
                prevDetails.map(detail =>
                    detail.title === title ? { ...detail, value } : detail
                )
            );
        } else {
            setReferDetails(prevDetails =>
                [...prevDetails, { title, value }]
            );
        }
    }

    useEffect(() => {
        return () => {
            getReferData(referDetails);
        }
    }, [referDetails]);

    return (
        <div>
            <h3>Refer Details</h3>
            <div>
                <FormTextBoxCtrl label="GP Name" onChangeText={onChangeTextHandle} title="GPName" value={referData.find(detail => detail.title === "GPName")?.value || ""}/>
                <FormTextBoxCtrl label="GP Practice" onChangeText={onChangeTextHandle} title="GPPractice" value={referData.find(detail => detail.title === "GPPractice")?.value || ""}/>
                <button onClick={handleNext}>Next</button>
            </div>
            
        </div>
    )
}

export default RefererDetails