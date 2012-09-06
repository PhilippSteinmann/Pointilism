<?php

/**
 * Basekeywords
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property string $keyword
 * 
 * @method string   getKeyword() Returns the current record's "keyword" value
 * @method keywords setKeyword() Sets the current record's "keyword" value
 * 
 * @package    Mosaic
 * @subpackage model
 * @author     Philipp Steinmann
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class Basekeywords extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('keywords');
        $this->hasColumn('keyword', 'string', 100, array(
             'type' => 'string',
             'length' => 100,
             ));
    }

    public function setUp()
    {
        parent::setUp();
        
    }
}