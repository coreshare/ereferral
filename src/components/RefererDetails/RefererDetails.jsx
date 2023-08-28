import React,{useState,useEffect} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import FormDateCtrl from "../FormDateCtrl/FormDateCtrl";

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
        <div className="detailssection">
            <div style={{float:'left'}}>
                <h3 className="detailsHeader">Refer Details</h3>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="GP Name" onChangeText={onChangeTextHandle} title="GPName" value={referData.find(detail => detail.title === "GPName")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="GP Practice Name" onChangeText={onChangeTextHandle} title="GPPractice" value={referData.find(detail => detail.title === "GPPractice")?.value || ""}/><br/>
                        <FormTextAreaCtrl label="GP Practice Address" onChangeText={onChangeTextHandle} title="GPPracticeAddress" value={referData.find(detail => detail.title === "GPPracticeAddress")?.value || ""}/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Referring Organisation" onChangeText={onChangeTextHandle} title="ReferringOrganisation" value={referData.find(detail => detail.title === "ReferringOrganisation")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="Referring Consultant" onChangeText={onChangeTextHandle} title="ReferringConsultant" value={referData.find(detail => detail.title === "ReferringConsultant")?.value || ""}/><br/>
                        <FormDateCtrl label="Date Decision to Refer" onChangeText={onChangeTextHandle} title="DateDecisiontoRefer" value={referData.find(detail => detail.title === "DateDecisiontoRefer")?.value || ""}/>
                        
                    </div>
                </div>
            </div>
            
            <div className="detailsNext">
                    <button onClick={handleNext}>Next</button>
                </div>
        </div>
    )
}

export default RefererDetails