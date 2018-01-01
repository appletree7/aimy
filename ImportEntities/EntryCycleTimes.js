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
    public class CycleTimesEntry : ImportObjectBase {
	  [XmlAttribute]
	  public int Period { get; set; }

	  [XmlAttribute]
	  public int OrderNumber { get; set; }

	  [XmlAttribute]
	  public string Name { get; set; }

	  [XmlAttribute]
	  public int Quantity { get; set; }

	  [XmlAttribute("MinimumTime")]
	  public string MinimumTimeString { get; set; }

	  [XmlIgnore]
	  public int? MinimumTime {
		get {
		    try {
			  return (int)ToDouble(MinimumTimeString);
		    } catch (Exception) {
			  return null;
		    }
		}
	  }

	  [XmlAttribute]
	  public int Time { get; set; }

	  [XmlAttribute("Factor")]
	  public string FactorString { get; set; }

	  [XmlIgnore]
	  public double? Factor {
		get {
		    try {
			  return ToDouble(FactorString);
		    } catch (Exception) {
			  return null;
		    }
		}
	  }
    }
}
