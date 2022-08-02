# Research Outline:
Use this section to set an outline and guiding vision describing your work. 

### The Problem (What)
- A knowledge graph over envrionmental and climate science research abstracts.

### Why even do this? (Why)
- There is a huge amount of scientific research addressing climate change. The goal is to make it easier for researchers to work with that knowledge. Kind of like a "second brain"

### How do current approaches fail or fall short?
- Not domain specific
- Dont model climate science specific verbage in relations

### What does our solution look like?
- Use existing relation extraction systems (Holmes, PURE, DyGie++) over a subset of S2ORC

### When is the problem considered "solved"?
- The proposal will be a description of the system while the follow up paper will require a user review with scientists to see if the system works for them.

### What are potential pitfalls or known unknowns?
- Poor data
- Lack of domain knowledge
- Lack of consistency in verbage used between entities to form pattern extractors

### What is the plan?
- Download the S2ORC subset
- Lit Review
- Find a writing schedule for the paper
- Go over abstracts to start determing some entities and relations
- Determine which pre-existing RE system will be best to adapt to the task

# Documentation
Use this section to get a head start in ensuring your work is reproducible and readers hoping to apply your research can follow along with little hassle. 

### Setup
- Describe how to set up the project. What are the dependencies, any hardware/software requirements, where/how can we download the data used?

### Train / Test
- If you created an ML system, how can we run the training loop on our machine? How do evaluate the model the same way as the paper?
- If this isn't an ML system you can still describe the testing/eval process here so others can recreate your work easily. 

### Usage
- Share example usage code or describe how someone might apply your solution to their own domain. 
