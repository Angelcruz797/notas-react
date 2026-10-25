import useFileMutations from '../../../../hook/useFileMutations';
import { useDrawStore } from '../../../../store/useDrawStore';

const SaveButton = () => {
	const saveDraw = useDrawStore(s=>s.saveDraw);
	const hasUnsavedChanges = useDrawStore(s=>s.hasUnsavedChanges);
	const {updateFile, isLoading} = useFileMutations();

	return (
	<div className="tlui-menu">
		<button 
			className={`${hasUnsavedChanges? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700':'bg-gray-500'} px-7 py-2 rounded text-white font-semibold`} 
			onClick={()=>saveDraw(updateFile)} 
			disabled={!hasUnsavedChanges || isLoading}
		>
		Save
		</button>
	</div>
	)
}

export default SaveButton