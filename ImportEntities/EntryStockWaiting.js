/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace IbsysPlanspielApp.ImportEntities {
    public class StockWaitingEntry : ImportObjectBase {
	  [XmlAttribute]
	  public string RequiredItem { get; set; }

	  [XmlAttribute]
	  public int Period { get; set; }

	  [XmlAttribute]
	  public int OrderNumber { get; set; }

	  [XmlAttribute]
	  public string BatchRange { get; set; }

	  [XmlAttribute]
	  public string Item { get; set; }

	  [XmlAttribute("Quantity")]
	  public string QuantityString { get; set; }

	  [XmlIgnore]
	  public int Quantity {
		get {
		    return ToInt(QuantityString);
		}
	  }

    }
}
