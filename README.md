# tray.io Frontend Engineer Technical Exercise

## Installation

`yarn install`

## Start local dev server

`yarn start`

App will be vailable at http://localhost:1234/

## Other commands

- `yarn build` - bundles a production build of the app within a `build` folder
- `yarn lint` - runs the linter for every file within the `src` folder
- `yarn test` - runs any `*.test.js` files

## Task outline
You will write a web application that shows a web form to collect data from a user before signing up for a service. See the screenshot below for possible design and layout of requirements, but feel free to come up with your own design for the form if there are changes you think would be an improvement.

## Requirements
Build a GUI that:
- **Show one page of the form at a time. &#x2713;**
	The form is broken up into discrete components that are managed by a `Wizard` component that receives its progress from a `SignUp` component derived from a URL param. This means the different stages of the form are route based; allowing users to navigate via browser history and allows for the possibility of deep-linking. The `Wizard` itself is agnostic to where its "step" indexes are derived from, allowing it to be managed simply by a local component state if desired.
- **Show the current page position of the form. &#x2713;**
	The `Wizard` component contains a `WizardStepStatus` component. It combines data from the steps provided to the `Wizard` to render with the "step" URL param to display a UI that represents the user's progress.
- **Validate the input fields upon submission of each page. &#x2713;**
	The `SignUp` component implements a couple of custom hooks to implement form validation within the app. "useSignUpStore" is a straightforward reducer to track the form state. Whilst "useSignUpValidation" takes this state and derives any errors from it. "useSignUpValidation" is also responsible for providing management for when these errors should be displayed i.e. when the user attempts to progress the form. For this task, only the first step of the form requires validation, so we simply check for the presence of errors. However, if we introduced additional form steps later on that required validation, "useSignUpValidation" would have to be extended with data that allowed it to discern which form errors would be relevant for the current step e.g. an array of form fields for the current step to run validation checks on, rather than checking every field that has a validation method.
- **If there are any validation errors, show an error message in the form
and block progress. &#x2713;**
	Once validation has been triggered, any errors are passed down to the relevant `FormInput` component and displayed. The "errored" inputs also turn orange to highlight which fields require updating. From a UX point of view, orange is a better colour for highlighting errors since the traditional red tends to be severe and stress-inducing. Orange is bright enough to call attention to itself without having an anxiety-inducing association.
- **Console.logs the resultant data on the final page. &#x2713;**
	The final step logs the "signUpStore" to the console, whilst also displaying a summarised version of it on the page.

## Extensibility considerations

- **How would you change the configuration of a certain page?**
	The individual `FormInput`s can be arbitrarily rearranged within the various `SignUp` components. And the custom hooks used within the main `SignUp` component can be modified/extended to determine the shape of the form data, as well as new fields as well as how those fields should be validated.
- **How would you add new pages?**
	The `Wizard` component dynamically renders its content depending on the shape of its `steps` prop, which represents the page order and content. Defining this shape is straightforward, allowing additional pages to be added simply by extending the array that is passed to the `Wizard`'s `steps` prop. This also makes reordering pages trivial as well.
- **How would you implement going back a page?**
	This is already supported in a way because the `SignUp` `Wizard` is route-based, allowing the user to backtrack via their browser history. However, implementing a back button would be fairly straightforward since it would only have to redirect back one step. We'd have to extend the classes used within `Wizard` in order to animate the transition conditionally based on direction.

## Other notes
- I've only included a couple of tests for this challenge since I wanted to illustrate how I typically structure my tests. As well as demonstrate how to deal with trickier `react-router-dom` dependant components that require certain environmental conditions to run i.e. wrapping it within a `Router` and calling it within a `Route` is preferable to mocking since it's a more decoupled, reliable method that is similar to runtime conditions.
- I initially tried to mirror the Tray.io branding in order to come up with a colour scheme for the app. But I had to tweak the colours for readability reasons after checking the contrast via https://contrastchecker.com/. I ended up going with a muted colour sheme coupled with neutralised greens and oranges that stood out as primary calls to action against the grey whilst still being readable.
- There are no comments in my code since I strongly believe that code should be self-documenting. I'm sure my naming could be improved on though!
