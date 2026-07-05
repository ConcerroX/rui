---
title: Text Field
docSlug: components/text-field
tab: guidelines
locale: en
designOrder: 20
developOrder: 20
outline:
    - id: guidelines-when-to-use
      label: When to use
api: /en/api/text-field
---

## Usage

Text fields allow users to enter text into a UI. They typically appear in forms and dialogs.

### Principles

#### Discoverable

Text fields should stand out and indicate that users can input information.

#### Clear

Text field states should be clearly differentiated from one another.

#### Efficient

Text fields should make it easy to understand the requested information and to address any errors.

### Types

Text fields come in two types:

- Filled text fields
- Outlined text fields

Both types of text fields use a container to provide a clear affordance for interaction, making the fields discoverable
in layouts.

### Choosing the right text field

Both types of text fields provide the same functionality, so the type of text field you use can depend on style alone.

Choose the type that:

- Works best with your app’s visual style
- Best accommodates the goals of your UI
- Is most distinct from other components (like buttons) and surrounding content

#### Both types of text fields in one UI

If both types of text fields are used in a single UI, they should be used consistently within different sections,
and not intermixed within the same region.
For example, you could use outlined text fields in one section and filled text fields in another.

## Anatomy

### Container

Containers improve the discoverability of text fields by creating contrast between the text field and surrounding content.

#### Fill and stroke

A text field container has a fill and a stroke (either around the entire container, or just the bottom edge). The color
and thickness of a stroke can change to indicate when the text field is active.

#### Rounded corners

The container of an outlined text field has rounded corners, while the container of a filled text field has rounded top
corners and square bottom corners.

### Label text

Label text is used to inform users as to what information is requested for a text field. Every text field should have a label.

Label text should be aligned with the input line, and always visible. It can be placed in the middle of a text field,
or rest near the top of the container.

#### Required text indicator

To indicate that a field is required, display an asterisk (\*) next to the label text and mention near the form that
asterisks indicate required fields.

- If some fields are required, indicate all required ones
- If most fields are required, indicate optional fields by displaying the word “optional” in parentheses next to the label text
- If required text is colored, that color should also be used for the asterisk

### Input text

### Assistive elements

#### Error text

For text fields that validate their content (such as passwords), replace helper text with error text when applicable.
Swapping helper text with error text helps prevent new lines of text from being introduced into a layout, thus bumping
content to fit it.

- If only one error is possible, error text describes how to avoid the error
- If multiple errors are possible, error text describes how to avoid the most likely error

#### Icons

Icons in text fields are optional. Text field icons can describe valid input methods (such as a microphone icon), provide
affordances to access additional functionality (such as clearing the content of a field), and can express an error.

Leading and trailing icons change their position based on LTR or RTL contexts.

## Behavior

### Scaling and adaptation

As layouts adapt to larger screens and form factors, apply flexible container dimensions to text fields. Set minimum and
maximum values for margins, padding, and container dimensions as layouts scale so that typography adjusts for better
reading experiences.

As text fields expand within fluid layouts, avoid maintaining fixed margins and typography properties because this can
lead to extra long text fields. Text fields should not, for example, span the full width of a large screen.

## Filled text field
