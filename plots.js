//Directly from Module 12.4.3

function init() {
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    })}

    init();
  
function optionChanged(newSample) {
    // Refresh data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  
  // Build Metadata

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(result);
    });
  }

  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0,9];
   
   //Build bar chart

  //retrieve filtered information
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    
    var barData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "bar",
        orientation: "h",
      }
    ];
    var layout = {
      title: "Top 10 Bacteria",
    };
    Plotly.newPlot("bar", barData, layout);
  });
}
  // Build a Bubble Chart sourced https://plotly.com/javascript/bubble-charts/
      var bubbleLayout = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };

      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
            marker: {
            size: sample_values, 
            color: ['rgb(120,120,120)', 'rgb(120,120,120)', 'red', 'rgb(120,120,120)'],
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  

  
  