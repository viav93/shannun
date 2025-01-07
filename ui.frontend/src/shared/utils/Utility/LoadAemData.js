import React, { useEffect } from "react";
import { render } from "react-dom";

const LoadAemData = ({ children }) => {
  useEffect(() => {
    const readAttributesAndCallAPI = async () => {
      // Find all elements with data-path, data-clientlib, and data-react-component attributes
      const elements = document.querySelectorAll(
        "[data-path][data-clientlib][data-react-component][data-id][data-react-parent]"
      );

      // Process each element
      Array.from(elements).forEach(async (element) => {
        const dataPath = element.getAttribute("data-path");
        const dataClientlib = element.getAttribute("data-clientlib");
        const componentName = element.getAttribute("data-react-component");
        const componentId = element.getAttribute("data-id");
        const parent = element.getAttribute("data-react-parent");

        try {
          // Fetch the path data
          const aemData = await fetch(`${dataPath}.model.json`).then((res) =>
            res.json()
          );

          // Create a script element for the clientlib and add it to the document
          const script = document.createElement("script");
          script.src = dataClientlib;
          script.onload = () => {
            // Once the script is loaded, call the renderComponent function
            renderComponent(
              window[parent][componentName],
              aemData,
              componentId
            );
          };
          script.onerror = () => {
            console.error(`Failed to load script: ${dataClientlib}`);
          };
          document.body.appendChild(script);
        } catch (error) {
          const errorMsg = {
            componentName,
            aemData: { error: `Path Error: ${error.message}` },
            clientlibData: { error: `Clientlib Error: ${error.message}` },
          };
          console.error(JSON.stringify(errorMsg));
        }
      });
    };

    readAttributesAndCallAPI();
  }, []);

  return <>{children}</>;
};

export default LoadAemData;

// External renderComponent function that you need to define elsewhere
const renderComponent = (component, aemdata, componentId) => {
  // Implement the rendering logic based on the component name and path data
  render(
    React.createElement(component, { aemdata }),
    document.getElementById(componentId)
  );
  console.log(
    `Rendering component: ${component}, componentId: ${componentId} with data`,
    aemdata
  );
};
