import StepForm from "@components/forms/StepForm";
import Input from "@forms/Input";
import { formatSiret, unformatSiret } from "./SiretSearch";

const statusOptionsList = [
	{ code: "association", label: "Association" },
	{ code: "entreprise", label: "Entreprise" },
	{ code: "ccas-cias", label: "CCAS / CIAS" }
];

/**
 * A block of fields for the mosttop level Organisme infos
 * (step 2 of the registration process)
 * @param {StateMachime} stateMachine the registration wizard state machine
 */
export const OrganismeForm = ({ formId = "organisme", data = {}, onSubmit }) => {
	return (
		<StepForm formId={formId} data={data} onSubmit={onSubmit}>
			<Input.Formatted
				label="No de Siret"
				name="siret"
				readOnly
				format={formatSiret}
				serialize={unformatSiret}
				validation={{ required: "Saisissez un no de SIRET valide (14 chiffres)" }}
			/>
			<Input.Text
				label="Nom"
				name="nom"
				autoFocus={true}
				validation={{ required: "Saisissez le nom de l'organisme" }}
			/>
			<Input.Date
				label="Date de création"
				name="date_creation"
				validation={{ required: "Saisissez la date de création de l'organisme" }}
			/>
			<Input.SelectBox
				label="Statut"
				name="statut"
				options={statusOptionsList}
				validation={{ required: "Saisissez le statut de l'organisme" }}
			/>
		</StepForm>
	);
};

export default {
	title: "Informations de l'organisme",
	form: (data) => <OrganismeForm dta={data} />
};
