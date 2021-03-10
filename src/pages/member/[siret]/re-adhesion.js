import AdherentsApiClient from "@lib/client/AdherentsApiClient.js";
import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import AdminDashboard from "../index.js";
import { useEventBus, withEventBus } from "@components/EventBusProvider.js";
import ReadOnlyForm from "@components/forms/ReadOnlyForm.js";
import ReadhesionWizard from "@components/forms/registration/ReadhesionWizard.js";

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * @returns {Object} props passed to main
 */
export const getServerSideProps = async (context) => {
	const { siret } = context.params;
	return {
		props: { siret } // will be passed to the page component as props
	};
};

const LoadReAdhesion = ({ adherent, error }) => {
	if (error) return <Box>{error}</Box>;
	if (adherent) return <ReadOnlyForm tabs={tabsDef} data={adherent} />;
	return null;
};

/**
 * Display the detail of an adherent using multiple tabs
 * to organize the data
 */
const PageReAdhesion = ({ siret }) => {
	const eb = useEventBus();
	const [currentTab, setCurrentTab] = useState(0);
	const [adherent, setAdherent] = useState();
	const [error, setError] = useState(false);

	useEffect(async () => {
		try {
			const { adherent } = await AdherentsApiClient.retrieveBySiret(siret);
			setAdherent(adherent);
		} catch (err) {
			setError(err.message);
		}
	}, [false]);

	return (
		<AdminDashboard
			title={adherent && adherent.nom}
			tabs={tabHeaders(eb, setCurrentTab)}
			currentTab={currentTab}
		>
			<LoadReAdhesion data={adherent} error={error} />
		</AdminDashboard>
	);
};

export default withEventBus(PageReAdhesion);
