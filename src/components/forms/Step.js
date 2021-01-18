import { Grid } from "@material-ui/core";
import Input from "@forms/Input";
import StepForm from "./StepForm";

/**
 * @typedef StepDef
 * @param {String} id
 * @param {String} title
 * @param {String} description
 * @param {Number} size
 * @param {Array<FieldDef>} fields
 */

/**
 * @typedef FieldDef
 * @param {String} name
 * @param {String} label
 * @param {String} type=text|date|integer|percent|mail|url
 * @param {Boolean} required
 * @param {Object} [validation] custom validation rules
 * @param {Function} [displayForm] custom implementation (optional)
 */

/**
 * Creates a step object suitable to use inside StepForm
 * From a flat description of the required fields
 * @param {StepDef} step
 */
function Step(step) {
	// Validate that all required fields are provided
	["id", "title"].forEach((fieldName) => {
		if (!step[fieldName]) {
			throw new TypeError(`A '${fieldName}' is required to create a Step`);
		}
	});
	if (!Array.isArray(step.fields) && typeof step.displayForm !== "function") {
		throw new TypeError(
			`You must provide an array of fields definitions or a custom displayForm method to create a Step : 
${JSON.stringify(step, null, "\t")}`
		);
	}
	step.size = step.size || 1;
	// It's ok : assign all
	Object.assign(this, step);
}

Step.prototype = {
	displayForm: function (data, onSubmit) {
		return (
			<StepForm formId={`${this.id}`} data={data} onSubmit={onSubmit}>
				<Grid container>
					{this.fields.map(({ type = "text", size = 1, ...fieldProps }, i) => (
						<Grid item sm={Number(size) * 12}>
							<Input
								key={`${this.id}-input-${i}`}
								type={type}
								autoFocus={i === 0}
								{...fieldProps}
							/>
						</Grid>
					))}
				</Grid>
			</StepForm>
		);
	}
};

export default Step;
