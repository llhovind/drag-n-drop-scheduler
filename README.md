# Drag-n-Drop-Scheduler

### A visual calendar of personnel shift schedules utilizing drag-n-drop to make assignments.

This is a demonstration of a maintainable web app architecture. At the most basic it is a list of Shift Assignments (list data) presented in a calendar format. The Assignments are updated by dragging and dropping objects rather than using traditional form-based inputs. The goal is to illustrate how direct manipulation and selection-based interactions map to mutations in the underlying data model.

> Have a look at the [**LIVE DEMO**](http://www.hovind.com/demos/drag-n-drop-scheduler/)

#### Basic Architecture
The architecture is first broken down into Display Logic and Business Logic. The Display Logic is comprised of several components each into atomic units. The Calendar Grid is composed of Calendar Day components, each of which contains Shift components.

A second set of Components provides for the listing and display of the Servers. The Server component is atomic and repeated for each Server in the list of Servers, making the List flexible and expandable.

The Calendar and Server List are separate concerns and their apparent connection is in the Business Logic. The Business Logic consists of a Pinia Store which provides CRUD functions for the Cafe's personnel work shift schedules. The Shift component calls the Business Logic on the addition/removal of an Assignment, simple and straight-forward. The Server component then reads and reacts to these updates from the Business Logic. Vue's reactivity is used to update the display dynamically.

#### Display Logic State Data
The Calendar Grid creates a Context for display state data which is not Business Logic, but enhances the display by sharing state data across the components. Using this Context the Calendar and the Server component can communicate which Server should be highlighted. This affects only the presentation (display logic) and has no impact on the Shift Assignments (business logic). Thus providing a clean separation of concerns. At the same time providing visual filtering useful to the User.

#### Handling Drag-n-Drop Event Data
In addition to display data, an "event" was created in the Context to pass the drag-n-drop data. This was necessary because Chrome doesn't permit just any element to see the data of a DOM Drag-n-Drop event. In order for a Shift component to indicate if the Drop is permitted it needs to see that data prior to the Drop. While the HTML Spec permits access to the DnD Event Data, Chrome does not. This demonstrates a technique not just for cross browser compatibility, but for reclaiming functionality from vendor decisions.

#### TailwindCSS
Rounding out the demo is the use of TailwindCSS. Nearly all CSS Styling was done with Tailwind. However, rather that inject Tailwind's directives into the elements' tag, the Tailwind directives were applied in the `<style lang="postcss">` section of the components. This separated the HTML semantics from the styling. Making it easier for the developer to reason about the styling and make adjustments.

<br>
<br>

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```