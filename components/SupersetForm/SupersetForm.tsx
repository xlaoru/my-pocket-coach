import { ISupersetFormProps } from "@/types/props";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";

export default function SupersetForm({ supersetName, setSupersetName }: ISupersetFormProps) {
    return (
        <BottomSheetInput label="Superset Name" placeholder="e.g. Shoulder Circuit" value={supersetName} onChangeText={setSupersetName} />
    )
}
