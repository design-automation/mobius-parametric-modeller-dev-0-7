# UTIL    

## SelectEntities  
* **Description:** Select entities in the model.  
* **Parameters:**  
  * *entities:* undefined  
* **Returns:** void  
  
## ParamInfo  
* **Description:** Returns am html string representation of the parameters in this model  
* **Parameters:**  
* **Returns:** Text that summarises what is in the model.  
  
## EntityInfo  
* **Description:** Returns an html string representation of one or more entities in the model.
~  
* **Parameters:**  
  * *entities:* One or more objects ot collections.  
* **Returns:** void  
  
## ModelInfo  
* **Description:** Returns an html string representation of the contents of this model  
* **Parameters:**  
* **Returns:** Text that summarises what is in the model, click print to see this text.  
  
## ModelCheck  
* **Description:** Check the internal consistency of the model.  
* **Parameters:**  
* **Returns:** Text that summarises what is in the model, click print to see this text.  
  
## ModelCompare  
* **Description:** Compare the GI data in this model to the GI data in another model.
~
If method = subset, then this model is the answer, and the other model is the submitted model.
It will check that all entites in this model also exist in the other model.
~
If method = superset, then this model is the submitted model, and the other model is the answer model.
It will check that all entites in the other model also exist in this model.
~
For specifying the location of the GI Model, you can either specify a URL,
or the name of a file in LocalStorage.
In the latter case, you do not specify a path, you just specify the file name, e.g. 'my_model.gi'  
* **Parameters:**  
  * *input_data:* The location of the GI Model to compare this model to.  
  * *method:* Enum, method used to compare this model to the other model specified in the gi_model parameter.  
* **Returns:** Text that summarises the comparison between the two models.  
  
## SendData  
* **Description:** Post a message to the parent window.  
* **Parameters:**  
  * *data:* The data to send, a list or a dictionary.  
* **Returns:** Text that summarises what is in the model, click print to see this text.  
  
